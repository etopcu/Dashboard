function Register-ActionFilter($code){
	Add-CodeToMethod (Get-Project).Name "\Bootstrappers\" "Bootstrapper.ActionFilters.cs" "Bootstrapper" "ActionFilters" "GlobalFilters.Filters.Add($code);"
}

Export-ModuleMember -Function *