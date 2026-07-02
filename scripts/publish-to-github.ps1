# Commit and push to GitHub from this project folder
# Run from project root: .\scripts\publish-to-github.ps1 "Update hero and contact section"

param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Message
)

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\_git-paths.ps1"

Ensure-GitRepository

Push-Location $ProjectRoot
try {
    git add -A
    $status = git status --porcelain

    if (-not $status) {
        Write-Host "Nothing to commit - working tree is clean." -ForegroundColor Yellow
        exit 0
    }

    Write-Host ""
    git status -sb
    Write-Host ""
    git commit -m $Message

    Write-Host "Pulling latest from GitHub..." -ForegroundColor Cyan
    git pull --rebase origin main
    if ($LASTEXITCODE -ne 0) {
        throw "git pull --rebase failed with exit code $LASTEXITCODE"
    }

    git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        throw "git push failed with exit code $LASTEXITCODE"
    }

    Write-Host ""
    Write-Host "Pushed to GitHub successfully." -ForegroundColor Green
    Write-Host "Repo: https://github.com/papisgarage/papisenclosure" -ForegroundColor Cyan
} finally {
    Pop-Location
}
