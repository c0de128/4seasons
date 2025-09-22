# PowerShell script to save clipboard image
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$clipboard = [System.Windows.Forms.Clipboard]::GetDataObject()
if ($clipboard.ContainsImage()) {
    $img = $clipboard.GetImage()
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $filename = "clipboard_$timestamp.png"
    $path = Join-Path $PSScriptRoot $filename
    $img.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Image saved to: $path"
    Set-Clipboard -Value $path
    Write-Host "Path copied to clipboard!"
} else {
    Write-Host "No image in clipboard"
}