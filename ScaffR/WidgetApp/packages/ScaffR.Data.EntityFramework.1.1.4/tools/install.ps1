param($installPath, $toolsPath, $package, $project)

Scaffold ScaffR.Data.EntityFramework

Enable-Migrations -EnableAutomaticMigrations -ProjectName $dataProjectName

(get-projectitem "Migrations/Configuration.cs" -project $dataProjectName).Document.Close()

Scaffold ScaffR.Data.Migration -force

Add-Migration "Database Created" -ProjectName $dataProjectName

update-database -ProjectName $dataProjectName