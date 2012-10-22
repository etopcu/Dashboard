#http://csharpening.net/?p=623
#http://msdn.microsoft.com/en-us/library/ms228763.aspx
#http://msdn.microsoft.com/en-us/library/envdte.projectitem_members(v=vs.80).aspx
#https://entlibcontrib.svn.codeplex.com/svn/Application%20Block%20Factory/BlockFactory/BlockFactory/Helpers/ProjectItemHelper.cs
#http://msdn.microsoft.com/en-us/library/envdte.vscmtyperef(v=vs.100).aspx

function With-Reference($references){
    
    begin { $project }

    process{                 
        $project = $_
        if($project){        
            $projectName = $project.ProjectName        
            foreach ($reference in $references.split(",")){            
                if(($DTE.Solution.Projects | Select-Object -ExpandProperty Name) -notcontains $reference){                                        
                    $project.Object.References.Add($reference)                     
                }
                else{
                    $project.Object.References.AddProject((Get-Project $reference))
                }                            
            }                    
        }        
    }
}

function With-Package($packages){
    
    begin { $project }

    process{                 
        $project = $_
        if($project){        
            $projectName = $project.ProjectName        
            foreach ($package in $packages.split(",")){            
                install-package $package -ProjectName $projectName                        
            }                    
        }        
    }

    end { return }
}


function Get-Solution(){

    $solution = Get-Interface $dte.Solution ([EnvDTE80.Solution2])
    $name = [System.IO.Path]::GetFilename($solution.FullName)
    $path = $solution.FullName.Replace($name,'').Replace('\\','\')	
    
    $sln = @()
    
    $obj = new-object System.Object
    
    $obj | add-member -MemberType noteproperty `
                      -Name Object  `
                      -Value $solution
                      
    $obj | add-member -MemberType noteproperty `
                      -Name Name  `
                      -Value $name
    
    $obj | add-member -MemberType noteproperty `
                      -Name Path `
                      -Value $path
    
    $sln += $obj
    
    return $sln
}

function Get-File([string]$ProjectName, [string]$Folder = "", [string]$FileName){
	$path = (get-solution).path	
	return $path.Trim() + $ProjectName.Trim() + $Folder.Trim() + $FileName.Trim()	
}


function Add-Template($projectName, $outputPath, $template, [switch]$force, $templateFolders){
	Add-ProjectItemViaTemplate $outputPath -Template $template `
		-Model @{ Namespace = $namespace } `
		-SuccessMessage "Successfully Added $template at {0}" `
		-Project $projectName `
		-Force:$Force `
		-TemplateFolders $templateFolders
}

function Add-TemplateWithModel($projectName, $outputPath, $template, $model, $force, $templateFolders){
		
	Add-ProjectItemViaTemplate $outputPath -Template $template `
		-Model $model `
		-SuccessMessage "Successfully Added $template at {0}" `
		-Project $projectName `
		-Force:$Force `
		-TemplateFolders $templateFolders
}

function Add-CodeToMethod([string]$ProjectName, [string]$Folder = "", [string]$FileName,[string]$ClassName, [string]$MethodName, [string]$Code){

	$filepath = Get-File $ProjectName $Folder $FileName	
	$file = $DTE.Solution.FindProjectItem($filepath)
	if($file -eq $null){
		return
	}
	$file.Open().Activate()
		
	$ns = $DTE.ActiveDocument.ProjectItem.FileCodeModel.CodeElements | Where-Object{$_.Kind -eq 5}
	$classes = $ns | ForEach{$_.Children}	
	$classes | ForEach{	
		if(!($_.Name -eq $null)){						
			if($_.Name -eq $ClassName){
				$_.Children | ForEach{
					if($_.Name -eq $MethodName){	
						$addCode = $true
						$edit = $_.EndPoint.CreateEditPoint()
						$edit.GetLines($_.StartPoint.Line,$_.EndPoint.Line).split("`n") | ForEach{													
							if($_.Contains($Code)){								
								$addCode = $false
							}
						}												
						if($addCode -eq $true){
							$edit.StartOfLine()																	
							$edit.Insert($Code)
						}
					}					
				}	
			}
		}
	}	
	$DTE.ExecuteCommand("Edit.FormatDocument")
	$file.Save()	
	#$file.Close()
}


function Add-Namespace([string]$ProjectName, [string]$Folder = "", [string]$FileName,[string]$Namespace){

	$filepath = Get-File $ProjectName $Folder $FileName
	
	$file = $DTE.Solution.FindProjectItem($filepath)
	$file.Open().Document.Activate()
	
	$checkForThis = "using $($Namespace);" 
	$exists = $false
	
	Get-Content $filepath | foreach-Object {  if($_.Contains($checkForThis)){ $exists = $true }}
	
	if($exists -eq $false){
		$DTE.ActiveDocument.Selection.StartOfDocument()
		$DTE.ActiveDocument.Selection.NewLine()
		$DTE.ActiveDocument.Selection.LineUp()
		$DTE.ActiveDocument.Selection.Insert($checkForThis)
		$DTE.ExecuteCommand("Edit.FormatDocument")
		$file.Save()
	}	
}

function Get-Class($classname){

	$namespaces = $DTE.Documents | ForEach{$_.ProjectItem.FileCodeModel.CodeElements | Where-Object{$_.Kind -eq 5}}	
	#Write-Host $classname
	$classes = $namespaces | ForEach{$_.Children}
	$ret = $null
	#Write-Host $classes
	$classes | ForEach{	
		if(!($_.Name -eq $null)){						
			if($_.Name.Trim() -eq $classname){					
				$ret = $_
			}
		}
	}		
	#Write-Host $ret
	return $ret
}

function Get-Properties($type){
	if($type -eq $null){
		Write-Host "You have to provide a DTE class. Use Get-Domain 'BaseClass' or Get-Class 'classname' to get the class(es) you want"
		return $null
	}
	return ForEach{$type.Children | Where-Object{$_.Kind -eq 4}}
}

function Get-LineOfMethod([string]$type, [string]$methodName){	
	
	$t = Get-Class($type)
	$ret = $null
	$t.Children | ForEach{
		if($_.Name -eq $methodName){
			Write-Host "Method found"
			Write-Host $_
			$ret = $_.EndPoint.Line
		}
	}	
	return $ret	
}

function Add-Text([string]$type = "", [string]$methodName, [string]$text){		
	$m = Get-LineOfMethod($type,$methodName)
	Write-Host $m
	return $m	
}

function Has-Package($project, $package){
	return (get-package | Select-Object -ExpandProperty ID) -contains $package;
}

function Find-Class([string]$className){
	$classElements = Find-AllClasses	
	foreach ($class in $classElements){
		if ($class.FullName -eq $ClassName){
			$class
		}
	}
}

function Add-Project($projectName){
    if(($DTE.Solution.Projects | Select-Object -ExpandProperty Name) -notcontains $projectName){
    
        $path = (get-solution).path
        
        $templatePath = (get-solution).object.GetProjectTemplate("ClassLibrary.zip","CSharp")	
        		
		(get-solution).object.AddFromTemplate($templatePath, $path+$projectName,$projectName)
        
		
        
		Install-Package EntityFramework `
			-ProjectName $projectName -Version 5.0.0
		
		Install-Package ScaffR.Extensions `
			-ProjectName $projectName

		$items = @("Class1.cs", "App.Config", "deleteme.txt")

		$items | % { (get-projectitem $_ -Project $projectName).Delete() }
           
	}
	get-project $projectName
}

function Find-AllClasses(){
	$namespaces = $DTE.Documents | ForEach{$_.ProjectItem.FileCodeModel.CodeElements | Where-Object{$_.Kind -eq 5}}		
	$namespaces | ForEach {$_.Children}
}

function Find-CodeElements($elements, [string]$type) {	
	if ($elements.Count -gt 0)
	{
		$kind = Get-CMElement $type
		$elements | % { Find-CodeElements $_.Children $type}
		$elements | ? {$_.Kind -eq $kind  }
	}
}

function Find-SuperClasses{
	param (
		$baseClass
	)
	Find-AllClasses | Where-Object { $_.Bases | Where-Object { $_.FullName -eq $baseClass} }
}

function Add-Variable([string]$className, [string]$access, [string]$type, [string]$variableName, $value)
{		
	$class = Find-Class $className
	$typeKind = Get-CMTypeRef $type
	$accessKind = Get-CMAccess $access
	$var = $class.AddVariable($variableName, $typeKind, 0, $accessKind, $value)
	$var.InitExpression = $value
	$var
}

function Add-Var
{
	[CmdletBinding(DefaultParameterSetName ='first')]
	param(
		[Parameter(
			ParameterSetName='first',ValueFromPipeline=$true,Position=0,mandatory=$true
		)]
		$class,
		[Parameter(
			ParameterSetName='second',Position=0,Mandatory=$true
		)]
		$className,
		$access,
		$type,
		$variableName,
		$value
	)
	
	if ($class -eq $null){
		$class = Find-Class $className
	}
	
	$typeKind = Get-CMTypeRef $type
	$accessKind = Get-CMAccess $access
	$var = $class.AddVariable($variableName, $typeKind, 0, $accessKind, $value)
	$var.InitExpression = $value
	$var
}

function Get-TopLevelElements() {
	$DTE.Solution.Projects | % { $_.ProjectItems | % { $_.FileCodeModel.CodeElements }}
}

function Get-CMAccess([string]$modifier){
	$modifier = (Get-Culture).TextInfo.ToTitleCase($modifier)
	$enumName = "vsCMAccess$modifier"
	$enumValue = [System.Enum]::Parse([EnvDTE.vsCMAccess], $enumName)
	return [int]$enumValue
}

function Get-CMElement([string]$modifier){
	$modifier = (Get-Culture).TextInfo.ToTitleCase($modifier)
	$enumName = "vsCMElement$modifier"
	$enumValue = [System.Enum]::Parse([EnvDTE.vsCMElement], $enumName)
	return [int]$enumValue
}

function Get-CMTypeRef([string]$modifier){
	$modifier = (Get-Culture).TextInfo.ToTitleCase($modifier)
	$enumName = "vsCMTypeRef$modifier"
	$enumValue = [System.Enum]::Parse([EnvDTE.vsCMTypeRef], $enumName)
	return [int]$enumValue
}

function Remove-Usings {
    $dte.ExecuteCommand("ProjectandSolutionContextMenus.Project.RemoveandSortUsings")
}

function Find-Symbol {
    param(
        [parameter(ValueFromPipelineByPropertyName = $true)]
        [string]$Name
    )

    $dte.ExecuteCommand("Edit.FindSymbol", $Name)
}

function Build-Project($Project){

	if(!$Project){
		$Project = (Get-Project)
	}

    $sb2 = Get-Interface $DTE.Solution.SolutionBuild ([EnvDTE80.SolutionBuild2])
    $config2 = Get-Interface $sb2.ActiveConfiguration ([EnvDTE80.SolutionConfiguration2])
    $configName = $config2.Name + '|' + $config2.PlatformName
	
	$solutionPath = (Get-Solution).Path
	$path = $Project.FullName.Replace($solutionPath,"")
	
    $sb2.BuildProject($configName, $path, $true)
}

Export-ModuleMember -Function *
