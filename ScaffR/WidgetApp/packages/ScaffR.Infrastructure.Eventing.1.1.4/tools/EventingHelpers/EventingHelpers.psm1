Function Register-EventHandler($instance){	
	Add-CodeToMethod (Get-Project).Name "\Bootstrappers\" "Bootstrapper.EventHandlers.cs" "Bootstrapper" "EventHandlers" "MessageBus.Instance.Subscribe($instance);"	
}

Export-ModuleMember -Function *
