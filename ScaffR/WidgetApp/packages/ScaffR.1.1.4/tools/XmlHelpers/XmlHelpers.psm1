function Get-XmlDocument([string]$ItemName, [string]$ProjectName){

	if ($ProjectName -eq $null){
		$ProjectName = (Get-Project).Name
	}

	$item = Get-ProjectItem $ItemName -Project $ProjectName
	[xml]$xml = gc $item.Document.FullName
	$xml
}

function Set-XmlAttribute([xml]$node, [string]$name, [string]$value){
	$node.SetAttribute($name, $value)
}

function Save-XmlDocument([xml]$xml, [string]$Path){
	$xml.Save($Path)
}


Export-ModuleMember Get-XmlDocument