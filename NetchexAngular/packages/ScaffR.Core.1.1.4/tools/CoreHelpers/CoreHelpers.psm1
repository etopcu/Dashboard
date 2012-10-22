function Add-Domain($outputPath, $template, [switch]$force, $templateFolders){
	Add-Template $coreProjectName $outputPath $template -Force:$Force $templateFolders	
	$file = Get-ProjectItem "$($outputPath).cs" -Project $coreProjectName
	$file.Open()
}

function Get-Domain(){
	Find-SuperClasses "$coreProjectName.Model.DomainObject"
}

Export-ModuleMember -Function *
