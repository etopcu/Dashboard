Function Register-NinjectDependency($from, $to){	
	Add-CodeToMethod $baseProject.Name "\Bootstrappers\" "Bootstrapper.Ninject.cs" "Bootstrapper" "RegisterServices" "kernel.Bind<$from>().To<$to>().InRequestScope();"
}

Export-ModuleMember -Function *
