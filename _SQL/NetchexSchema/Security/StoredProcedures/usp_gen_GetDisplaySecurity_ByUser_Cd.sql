--usp_gen_GetDisplaySecurity_ByUser_Cd 'sthomas75','Employee'
USE Security
GO

IF OBJECT_ID('dbo.usp_gen_GetDisplaySecurity_ByUser_Cd') IS NOT NULL DROP PROCEDURE dbo.usp_gen_GetDisplaySecurity_ByUser_Cd
GO

CREATE PROCEDURE usp_gen_GetDisplaySecurity_ByUser_Cd	
	@cUser_Cd		    VARCHAR(30),
	@cEmployeeType_Cd   VARCHAR(30)

AS

    ------------------------------------------------------------------------------------------------------------------------
    --  Update notes:
    --
    --      2012-02-01      - CREATED                                                                         Stephen Thomas
    ------------------------------------------------------------------------------------------------------------------------
    
    BEGIN TRY

    -----------------------------------------------------------------------------------------------------------------------------------------------
    -- DEBUG:
    -----------------------------------------------------------------------------------------------------------------------------------------------
    /*
    declare     @cUser_Cd		    VARCHAR(30),
	            @cEmployeeType_Cd   VARCHAR(30)
	            
    set    @cUser_Cd = 'sthomas75' 
    set    @cEmployeeType_Cd = 'Employee'    
    */

    IF @cEmployeeType_Cd = 'MANAGER'
    BEGIN
        SELECT 
            ISNULL(Uar.DemographicsView_Ind,0) AS DisplayDemographics_Ind, 
            ISNULL(Uar.EEOCView_Ind,0) AS DisplayEEOInfo_Ind, 
            ISNULL(Uar.EmployeeProfileView_Ind,0) AS DisplayPrInfo_Ind, 
            CAST(0 as bit) AS DisplayCurrentJob_Ind, 
            ISNULL(Uar.RequestedTimeOffView_Ind,0) AS DisplayAttendance_Ind, 
            CAST(0 as bit) AS DisplayCareerTrack_Ind,
            ISNULL(Uar.AccrualView_Ind,0) AS DisplayAccrual_Ind, 
            ISNULL(Uar.BenefitsView_Ind,0) AS DisplayBenefits_Ind, 
            ISNULL(Uar.DependentsBeneficiariesView_Ind,0) AS DisplayDependents_Ind, 
            CAST(0 as bit) AS DisplaySkills_Ind, 
            CAST(0 as bit) AS DisplayEducation_Ind, 
            CAST(0 as bit) AS DisplayPrevEmployer_Ind, 
            CAST(0 as bit) AS DisplayEvents_Ind, 
            ISNULL(Uar.EmergencyContactView_Ind,0) AS DisplayEmergency_Ind, 
            CAST(0 as bit) AS DisplayWellness_Ind, 
            CAST(0 as bit) AS DisplayOSHA_Ind, 
            ISNULL(Uar.MiscView_Ind,0) AS DisplayMiscellaneous_Ind, 
            ISNULL(Uar.NotesView_Ind,0) AS DisplayNotes_Ind, 
            CAST(0 as bit) AS DisplaySecurity_Ind, 
            ISNULL(Uar.LicenseView_Ind,0) AS DisplayLicenses_Ind, 
            CAST(0 as bit) AS DisplayRelation_Ind, 
            CAST(0 as bit) AS DisplayAssets_Ind, 
            ISNULL(Uar.EmployeeFilesView_Ind,0) AS DisplayAttachments_Ind, 
            ISNULL(Uar.CustomFieldsView_Ind,0) AS DisplayCustomFields_Ind, 
            CAST(0 as bit) AS DisplayCOBRA_Ind, 
            ISNULL(Uar.WageAndTaxView_Ind,0) AS DisplayBasicPayrollSetup_Ind, 
            ISNULL(Uar.DeductionsView_Ind,0) AS DisplayVoluntaryWithholdings_Ind, 
            ISNULL(Uar.OtherScheduledWagesView_Ind,0) AS DisplayWageandOtherEarnings_Ind, 
            ISNULL(Uar.DirectDepositView_Ind,0) AS DisplayACHDirectDeposit_Ind, 
            ISNULL(Uar.LaborDistributionView_Ind,0) AS DisplayPayrollLaborDistribution_Ind, 
            ISNULL(Uar.PaymentHistoryView_Ind,0) AS DisplayPaymentHistory_Ind, 						
            CAST(0 as bit) AS DisplayTraining_Ind, 
            ISNULL(Uar.TimeCardSetupView_Ind,0) AS DisplayTASetup_Ind, 
            ISNULL(Uar.TimeCardView_Ind,0) AS DisplayTimecard_Ind, 
            ISNULL(Uar.ScheduleView_Ind,0) AS DisplaySchedule_Ind, 
            ISNULL(Uar.EmployeeEventsModify_Ind,0) AS DisplayEmployeeEvents_Ind 
        FROM Security..Users Us 
        LEFT OUTER JOIN Security..UserSettings Uar ON Us.User_Cd = Uar.User_Cd 
        WHERE Us.User_Cd =  @cUser_Cd
    END
    ELSE
    BEGIN
        SELECT 
            Pp.DisplayDemographics_Ind,
            Pp.DisplayEEOInfo_Ind,
            Pp.DisplayPrInfo_Ind, 
            Pp.DisplayCurrentJob_Ind,
            Pp.DisplayAttendance_Ind,
            Pp.DisplayCareerTrack_Ind,
            ISNULL(Pp.DisplayAttendance_Ind,0) AS DisplayAccrual_Ind,
            Pp.DisplayBenefits_Ind,
            Pp.DisplayDependents_Ind,
            Pp.DisplaySkills_Ind,
            Pp.DisplayEducation_Ind,
            Pp.DisplayPrevEmployer_Ind,
            Pp.DisplayEvents_Ind,
            Pp.DisplayEmergency_Ind,
            Pp.DisplayWellness_Ind,
            Pp.DisplayOSHA_Ind,
            Pp.DisplayMiscellaneous_Ind,
            Pp.DisplayNotes_Ind,
            Pp.DisplaySecurity_Ind,
            Pp.DisplayLicenses_Ind,
            Pp.DisplayRelation_Ind,
            Pp.DisplayAssets_Ind,
            Pp.DisplayAttachments_Ind,
            Pp.DisplayCustomFields_Ind,
            Pp.DisplayCOBRA_Ind,
            Pp.DisplayBasicPayrollSetup_Ind,
            Pp.DisplayVoluntaryWithholdings_Ind,
            Pp.DisplayWageandOtherEarnings_Ind,
            Pp.DisplayACHDirectDeposit_Ind,
            Pp.DisplayPayrollLaborDistribution_Ind,
            Pp.DisplayPaymentHistory_Ind,
            Pp.DisplayTraining_Ind,
            Pp.DisplayTASetup_Ind,
            Pp.DisplayTimecard_Ind,
            Pp.DisplaySchedule_Ind,
            Pp.DisplayEmployeeEvents_Ind 
        FROM HRPremier..Person_Main Pm 
        JOIN HRPremier..Person_Preferences Pp 
            ON Pm.Employee_Cd = Pp.Employee_Cd 
        WHERE Pm.Employee_Cd = @cUser_Cd
    END
    
END TRY

------------------------------------------------------------------------------------------------------------
-- ERROR HANDLING:
------------------------------------------------------------------------------------------------------------
BEGIN CATCH
    EXECUTE HRPremier..usp_LogErr 
    PRINT ERROR_MESSAGE()         
END CATCH

GO