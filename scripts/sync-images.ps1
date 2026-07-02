# Sync images from Web Pictures and Font folder into public/ and src/assets/
# Run from project root: .\scripts\sync-images.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Write-Host "Syncing assets to $root ..." -ForegroundColor Cyan

$dirs = @(
    "public\fonts",
    "public\images\hero",
    "public\images\framing",
    "public\images\hydraulics",
    "public\images\finish",
    "public\images\gallery\tow-truck-1",
    "public\images\gallery\tow-truck-2",
    "public\images\gallery\framing",
    "public\images\gallery\hydraulics",
    "public\images\gallery\behind-the-scenes",
    "src\assets\images\hero",
    "src\assets\images\framing",
    "src\assets\images\hydraulics",
    "src\assets\images\finish",
    "src\assets\images\gallery\tow-truck-1",
    "src\assets\images\gallery\tow-truck-2"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path (Join-Path $root $dir) | Out-Null
}

# Font
$fontSrc = Join-Path $root "Font\ethnocentric rg.ttf"
$fontDst = Join-Path $root "public\fonts\ethnocentric-rg.ttf"
if (Test-Path $fontSrc) {
    Copy-Item $fontSrc $fontDst -Force
    Write-Host "  Font copied" -ForegroundColor Green
} else {
    Write-Host "  Font not found at $fontSrc" -ForegroundColor Yellow
}

function Sync-Folder($srcRelative, $destRelativeList) {
    $srcPath = Join-Path $root $srcRelative
    if (-not (Test-Path $srcPath)) {
        Write-Host "  Skipping missing: $srcRelative" -ForegroundColor Yellow
        return
    }
    foreach ($destRelative in $destRelativeList) {
        $destPath = Join-Path $root $destRelative
        New-Item -ItemType Directory -Force -Path $destPath | Out-Null
        Get-ChildItem $srcPath -Recurse -File -Include *.jpg,*.jpeg,*.png,*.webp,*.JPG,*.JPEG,*.PNG,*.WEBP |
            Copy-Item -Destination $destPath -Force
        $count = (Get-ChildItem $destPath -File -ErrorAction SilentlyContinue).Count
        Write-Host "  $srcRelative -> $destRelative ($count files)" -ForegroundColor Green
    }
}

# Main photo -> hero rotation
Sync-Folder "Web Pictures\Main photo" @(
    "public\images\hero",
    "src\assets\images\hero"
)

# Feature carousels
Sync-Folder "Web Pictures\hydraulics photos" @(
    "public\images\hydraulics",
    "src\assets\images\hydraulics",
    "public\images\gallery\hydraulics"
)
Sync-Folder "Web Pictures\glass" @(
    "public\images\finish",
    "src\assets\images\finish"
)

# Gallery: tow truck folders kept separate for 2+2 interleaving
Sync-Folder "Web Pictures\Tow truck #1 full photo shoot" @(
    "public\images\gallery\tow-truck-1",
    "src\assets\images\gallery\tow-truck-1",
    "public\images\framing",
    "src\assets\images\framing"
)
Sync-Folder "Web Pictures\Tow truck #2 full photo shoot" @(
    "public\images\gallery\tow-truck-2",
    "src\assets\images\gallery\tow-truck-2"
)

Write-Host "`nDone! Restart dev server to see new images." -ForegroundColor Cyan
Write-Host "  Hero: Web Pictures/Main photo -> images/hero" -ForegroundColor Cyan
Write-Host "  Gallery: tow-truck-1 + tow-truck-2 interleaved (2 at a time)" -ForegroundColor Cyan
