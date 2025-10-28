<#
.SYNOPSIS
Prepares the project for GitHub Pages deployment by exporting site files
and scaffolding a GitHub Actions workflow when needed.

.DESCRIPTION
This script packages the static site, ensures a GitHub Pages workflow exists,
and provides clear next steps to publish the repository to GitHub.

.NOTES
Requires PowerShell 5+ and write access to the project directory.
#>

param(
    [string]$SitePath = "${PSScriptRoot}\..\site",
    [string]$ExportPath = "${PSScriptRoot}\..\publish\export",
    [switch]$Force
)

function Ensure-Directory {
    <#
    .SYNOPSIS
    Ensures a directory exists, creating it if missing.

    .PARAMETER Path
    The directory path to check/create.
    #>
    param([Parameter(Mandatory=$true)][string]$Path)
    if (-not (Test-Path -Path $Path)) {
        New-Item -ItemType Directory -Path $Path | Out-Null
    }
}

function Export-SiteFiles {
    <#
    .SYNOPSIS
    Copies the static site files to an export folder and zips them.

    .PARAMETER Source
    Path to source site directory.

    .PARAMETER Destination
    Path to export destination directory.

    .PARAMETER Force
    Overwrite existing files if set.
    #>
    param(
        [Parameter(Mandatory=$true)][string]$Source,
        [Parameter(Mandatory=$true)][string]$Destination,
        [switch]$Force
    )
    if (-not (Test-Path -Path $Source)) {
        throw "Site source path not found: $Source"
    }

    Ensure-Directory -Path $Destination

    $exportSite = Join-Path $Destination "site"
    if (Test-Path -Path $exportSite -and $Force) {
        Remove-Item -Recurse -Force $exportSite
    }
    Ensure-Directory -Path $exportSite

    Copy-Item -Recurse -Force "$Source/*" $exportSite

    $zipPath = Join-Path $Destination "site-export.zip"
    if (Test-Path -Path $zipPath -and $Force) {
        Remove-Item -Force $zipPath
    }
    Compress-Archive -Path "$exportSite/*" -DestinationPath $zipPath -Force

    Write-Host "Exported site to: $exportSite"
    Write-Host "Created zip: $zipPath"
}

function Ensure-GitHubPagesWorkflow {
    <#
    .SYNOPSIS
    Ensures the GitHub Pages workflow file is present in .github/workflows.

    .PARAMETER RootPath
    Root path where the workflow directory should exist.
    #>
    param([Parameter(Mandatory=$true)][string]$RootPath)

    $workflowsDir = Join-Path $RootPath ".github/workflows"
    Ensure-Directory -Path $workflowsDir

    $workflowFile = Join-Path $workflowsDir "pages.yml"
    if (-not (Test-Path -Path $workflowFile)) {
        $content = @"
name: Deploy static site to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \\${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Upload static site as artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"@
        Set-Content -Path $workflowFile -Value $content -Encoding UTF8
        Write-Host "Created workflow: $workflowFile"
    } else {
        Write-Host "Workflow already exists: $workflowFile"
    }
}

function Show-NextSteps {
    <#
    .SYNOPSIS
    Prints actionable next steps to publish the repo to GitHub.
    #>
    Write-Host ""; Write-Host "Next steps to publish:" -ForegroundColor Cyan
    Write-Host "1) Create a new repo on GitHub (public) named your choice." 
    Write-Host "2) Push the project root to that repo:"
    Write-Host "   git init; git add .; git commit -m 'init';"
    Write-Host "   git branch -M main; git remote add origin https://github.com/<USER>/<REPO>.git"
    Write-Host "   git push -u origin main"
    Write-Host "3) GitHub Actions will auto-deploy Pages."
    Write-Host "4) Check Pages URL under Settings → Pages or Actions logs."
}

try {
    Export-SiteFiles -Source $SitePath -Destination $ExportPath -Force:$Force
    Ensure-GitHubPagesWorkflow -RootPath (Resolve-Path "${PSScriptRoot}\..\")
    Show-NextSteps
} catch {
    Write-Error $_
    exit 1
}

