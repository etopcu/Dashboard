function Add-DomainClass($outputPath, $template, [switch]$force, $templateFolders){
	
	Add-Domain $outputPath $template -force:$force $templateFolders

	scaffold scaffr.backend.for $template -force:$force
}

Export-ModuleMember Add-DomainClass
