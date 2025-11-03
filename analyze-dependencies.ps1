# Script d'analyse des dépendances pour WeHR
# Exécutez avec : powershell -ExecutionPolicy Bypass -File analyze-dependencies.ps1

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  ANALYSE DES DEPENDANCES - WeHR" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour analyser package.json
function Analyze-PackageJson {
    param (
        [string]$Path,
        [string]$Name
    )
    
    Write-Host "Analyse de $Name..." -ForegroundColor Yellow
    Write-Host "   Chemin: $Path" -ForegroundColor Gray
    Write-Host ""
    
    if (Test-Path $Path) {
        $package = Get-Content $Path | ConvertFrom-Json
        
        # Dépendances de production
        Write-Host "  Dependances de production:" -ForegroundColor Green
        if ($package.dependencies) {
            $depCount = ($package.dependencies | Get-Member -MemberType NoteProperty).Count
            Write-Host "     Total: $depCount packages" -ForegroundColor White
            $package.dependencies | Get-Member -MemberType NoteProperty | ForEach-Object {
                $name = $_.Name
                $version = $package.dependencies.$name
                Write-Host "     - $name : $version" -ForegroundColor Gray
            }
        } else {
            Write-Host "     Aucune dependance" -ForegroundColor Gray
        }
        Write-Host ""
        
        # Scripts disponibles
        Write-Host "  Scripts disponibles:" -ForegroundColor Magenta
        if ($package.scripts) {
            $package.scripts | Get-Member -MemberType NoteProperty | ForEach-Object {
                $name = $_.Name
                Write-Host "     - $name" -ForegroundColor Gray
            }
        }
        Write-Host ""
    } else {
        Write-Host "  Fichier non trouve: $Path" -ForegroundColor Red
        Write-Host ""
    }
}

# Analyser le backend
$backendPath = Join-Path $PSScriptRoot "backend\package.json"
Analyze-PackageJson -Path $backendPath -Name "Backend (NestJS)"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Analyser le frontend
$frontendPath = Join-Path $PSScriptRoot "frontend\package.json"
Analyze-PackageJson -Path $frontendPath -Name "Frontend (Angular)"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "ANALYSE TERMINEE" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
