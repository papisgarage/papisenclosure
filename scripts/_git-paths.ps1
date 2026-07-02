# Shared paths for git scripts
$ErrorActionPreference = "Stop"

$Script:ProjectRoot = Split-Path -Parent $PSScriptRoot
$Script:RemoteFile = Join-Path $Script:ProjectRoot "git.remote"

function Get-GitRemoteUrl {
    if (Test-Path $Script:RemoteFile) {
        $url = (Get-Content $Script:RemoteFile -Raw).Trim()
        if ($url) { return $url }
    }

    $existing = git -C $Script:ProjectRoot remote get-url origin 2>$null
    if ($LASTEXITCODE -eq 0 -and $existing) {
        return $existing.Trim()
    }

    throw "Missing git.remote. Copy git.remote.example to git.remote and set your GitHub repo URL."
}

function Ensure-GitRepository {
    if (-not (Test-Path (Join-Path $Script:ProjectRoot ".git"))) {
        Write-Host "Initializing git repository..." -ForegroundColor Yellow
        git -C $Script:ProjectRoot init | Out-Null
        git -C $Script:ProjectRoot branch -M main | Out-Null
    }

    $remoteUrl = Get-GitRemoteUrl
    $existing = git -C $Script:ProjectRoot remote get-url origin 2>$null
    if ($LASTEXITCODE -ne 0) {
        git -C $Script:ProjectRoot remote add origin $remoteUrl | Out-Null
        Write-Host "  Added remote origin" -ForegroundColor Green
    } elseif ($existing -ne $remoteUrl) {
        git -C $Script:ProjectRoot remote set-url origin $remoteUrl | Out-Null
        Write-Host "  Updated remote origin" -ForegroundColor Green
    }
}
