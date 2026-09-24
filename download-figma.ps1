$dir = "c:\Users\aashl\Downloads\SMP\gatsby project\static\figma"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Set-Location $dir
$prefix = "https://www.figma.com/api/mcp/asset/05fbcb76-735b-4465-ab57-5d3755ff0d80"
$files = @{
  "logo.png" = "8965b.png"
  "wordmark.png" = "589f2.png"
  "hero-people-1.png" = "08ac8.png"
  "hero-people-2.png" = "edc99.png"
  "team-steven.png" = "d7afb.png"
  "team-haider.png" = "335a7.png"
  "team-lauren.png" = "3b7b3.png"
  "photography.png" = "785b5.png"
  "client-1.png" = "611ed.png"
  "client-2.png" = "3c703.png"
  "client-3.png" = "3502d.png"
  "client-4.png" = "0aff2.png"
  "client-5.png" = "c636b.png"
  "client-6.png" = "dc1e4.png"
  "client-7.png" = "a8104.png"
  "client-8.png" = "84bb3.png"
  "client-9.png" = "b8340.png"
  "icon-google.svg" = "a4e36.svg"
  "icon-linkedin.svg" = "36107.svg"
  "icon-shutter.svg" = "5309c.svg"
  "icon-play.svg" = "fc4db.svg"
  "icon-whatsapp.svg" = "ae194.svg"
  "icon-arrow.svg" = "b77a0.svg"
  "icon-down.svg" = "0d44b.svg"
  "sm-yt.svg" = "a0c69.svg"
  "sm-vim.svg" = "a39dd.svg"
  "sm-in.svg" = "3af49.svg"
  "sm-pin.svg" = "46d07.svg"
  "sm-li.svg" = "52e6f.svg"
  "sm-fb.svg" = "1e5de.svg"
  "sm-x.svg" = "ccc28.svg"
  "sm-tmb.svg" = "da9cc.svg"
}
foreach ($name in $files.Keys) {
  Invoke-WebRequest -Uri "$prefix/$($files[$name])" -OutFile $name -UseBasicParsing
}
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/fec9f6bd-8fb8-4387-b464-fb868b87604b.png" -OutFile "hero-video.png" -UseBasicParsing
Invoke-WebRequest -Uri "https://www.figma.com/api/mcp/asset/a1750e33-9382-4a20-b53f-914ccca571b0.png" -OutFile "video-slider.png" -UseBasicParsing
Get-ChildItem | Select-Object Name, Length
