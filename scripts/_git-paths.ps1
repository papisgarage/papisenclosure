# Shared paths for git publish scripts
$ErrorActionPreference = "Stop"

$Script:ShareRoot = Split-Path -Parent $PSScriptRoot
$Script:GitRoot = "C:\Users\Papis\Documents\tow-truck-enclosure-website"
$Script:RemoteFile = Join-Path $Script:ShareRoot "git.remote"

function Get-GitRemoteUrl {
    if (Test-Path $Script:RemoteFile) {
        $url = (Get-Content $Script:RemoteFile -Raw).Trim()
        if ($url) { return $url }
    }

    throw "Missing git.remote. Copy git.remote.example to git.remote and set your GitHub repo URL."
}

function Sync-ShareToGit {
    Write-Host "Syncing project to local git folder..." -ForegroundColor Cyan
    Write-Host "  From: $Script:ShareRoot" -ForegroundColor DarkGray
    Write-Host "  To:   $Script:GitRoot" -ForegroundColor DarkGray

    if (-not (Test-Path $Script:GitRoot)) {
        New-Item -ItemType Directory -Force -Path $Script:GitRoot | Out-Null
    }

    $exitCode = 0
    robocopy $Script:ShareRoot $Script:GitRoot /MIR `
        /XD node_modules dist .git `
        /XF .env git.remote `
        /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
    $exitCode = $LASTEXITCODE

    # Robocopy exit codes 0-7 are success/partial success
    if ($exitCode -ge 8) {
        throw "Robocopy failed with exit code $exitCode"
    }

    Write-Host "  Sync complete." -ForegroundColor Green
}

function Ensure-GitRepository {
    if (-not (Test-Path (Join-Path $Script:GitRoot ".git"))) {
        Write-Host "Initializing git repository..." -ForegroundColor Yellow
        git -C $Script:GitRoot init | Out-Null
        git -C $Script:GitRoot branch -M main | Out-Null
    }

    $remoteUrl = Get-GitRemoteUrl
    $existing = git -C $Script:GitRoot remote get-url origin 2>$null
    if ($LASTEXITCODE -ne 0) {
        git -C $Script:GitRoot remote add origin $remoteUrl | Out-Null
        Write-Host "  Added remote origin" -ForegroundColor Green
    } elseif ($existing -ne $remoteUrl) {
        git -C $Script:GitRoot remote set-url origin $remoteUrl | Out-Null
        Write-Host "  Updated remote origin" -ForegroundColor Green
    }
}

