# Sync network project to local git folder, commit, and push to GitHub
# Run from project root: .\scripts\publish-to-github.ps1 "Update hero and contact section"

param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Message
)

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\_git-paths.ps1"

Ensure-GitRepository
Sync-ShareToGit

Push-Location $GitRoot
try {
    git add -A
    $status = git status --porcelain

    if (-not $status) {
        Write-Host "Nothing to commit - local repo already matches the project folder." -ForegroundColor Yellow
        exit 0
    }

    Write-Host ""
    git status -sb
    Write-Host ""
    git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m $Message
    git push -u origin main

    Write-Host ""
    Write-Host "Pushed to GitHub successfully." -ForegroundColor Green
    Write-Host "Repo: https://github.com/papisgarage/papisenclosure" -ForegroundColor Cyan
} finally {
    Pop-Location
}
