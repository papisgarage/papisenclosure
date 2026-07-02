# One-time setup: connect this folder to GitHub
# Run from project root: .\scripts\git-setup.ps1

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\_git-paths.ps1"

Write-Host "PAPIS Enclosures - Git setup" -ForegroundColor Cyan
Write-Host ""
Write-Host "Project: $ProjectRoot" -ForegroundColor DarkGray

$remoteUrl = Get-GitRemoteUrl
Write-Host "Remote:  $remoteUrl" -ForegroundColor DarkGray
Write-Host ""

Ensure-GitRepository

Push-Location $ProjectRoot
try {
    git status -sb
    Write-Host ""
    Write-Host "Git is ready." -ForegroundColor Green
    Write-Host "Push changes anytime with:" -ForegroundColor Cyan
    Write-Host '  .\scripts\publish-to-github.ps1 "Your commit message"' -ForegroundColor White
} finally {
    Pop-Location
}
