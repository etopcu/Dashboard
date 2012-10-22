$global:delegates = @()

function Register-Delegate([string]$name, [string]$callback)
{    
    # create object with named properties
    $newDelegate = New-Object System.Object
	$newDelegate | Add-Member -type NoteProperty -name Name -Value $name
	$newDelegate | Add-Member -type NoteProperty -name Callback -Value $callback

    # add this object to delgates arrray
    $global:delegates += $newDelegate
}


function Run-Delegates ([string]$name, [string]$scope)
{
    Write-Host Running delegates for $name and scope $scope

    # assing command to variable
#   $ci = get-command Scaffold
   $ci = get-command Write-Host

   # filter registered delegates by name
   $namedDelegates = $Global:delegates | where {$_.Name -EQ $name}

   foreach ($namedDelegate in $namedDelegates)
   {
        # run command with Callback and scope as parameters
		# &$ci $namedDelegate.Callback $parameter -Force:$Force
        & $namedDelegate.Callback $scope
   }
}

function Register-Backend([string]$callback){
	Register-Delegate "Scaffr.Backend.For" $callback
}

function Scaffold-Backend($scope)
{
	Run-Delegates "Scaffr.Backend.For" $scope
}

Export-ModuleMember -Function *
