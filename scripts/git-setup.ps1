# One-time setup: clone/connect local git folder to GitHub
# Run from project root: .\scripts\git-setup.ps1

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\_git-paths.ps1"

Write-Host "PAPIS Enclosures - Git setup" -ForegroundColor Cyan
Write-Host ""

$remoteUrl = Get-GitRemoteUrl
Write-Host "Remote: $remoteUrl" -ForegroundColor DarkGray

if (-not (Test-Path (Join-Path $GitRoot ".git"))) {
    Write-Host "Cloning repository..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path (Split-Path $GitRoot -Parent) | Out-Null
    git clone $remoteUrl $GitRoot
} else {
    Ensure-GitRepository
}

Sync-ShareToGit

Push-Location $GitRoot
try {
    git status -sb
    Write-Host ""
    Write-Host "Git is ready." -ForegroundColor Green
    Write-Host "Push changes anytime with:" -ForegroundColor Cyan
    Write-Host '  .\scripts\publish-to-github.ps1 "Your commit message"' -ForegroundColor White
} finally {
    Pop-Location
}
