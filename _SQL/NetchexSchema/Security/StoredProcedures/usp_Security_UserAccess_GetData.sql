--EXECUTE usp_Security_UserAccess_GetData 'CBOUDREAUX', 'MANAGER' 

USE [Security]
GO

IF OBJECT_ID('dbo.usp_Security_UserAccess_GetData') IS NOT NULL DROP PROCEDURE dbo.usp_Security_UserAccess_GetData
GO

CREATE PROCEDURE [dbo].[usp_Security_UserAccess_GetData]
(   
    @cUser_Cd           CHAR(30),
    @cEmployeeType_Txt  VARCHAR(50)
)

 
AS

    ------------------------------------------------------------------------------------------------------------------------
    --  Update notes:
    --
    --      2011-09-05      - CREATED                                                                           Jason Schock
    ------------------------------------------------------------------------------------------------------------------------

    SET NOCOUNT ON

    BEGIN TRY

        -----------------------------------------------------------------------------------------------------------------------------------------------
        -- OUTPUT:
        -----------------------------------------------------------------------------------------------------------------------------------------------
        IF @cEmployeeType_Txt = 'MANAGER'
         BEGIN
            SELECT 
                U.NetchexLogin_Ind, 
                ISNULL( US.DemographicsModify_Ind, 0 ) AS frmDemographicsEdit, 
	            ISNULL( US.EEOCModify_Ind, 0 ) AS frmEEOInformation, 
	            ISNULL( US.EmployeeProfileModify_Ind, 0 ) AS frmPrInfo, 
	            ISNULL( US.WageAndTaxModify_Ind, 0 ) AS frmBasicPayrollSetup, 
	            ISNULL( US.DirectDepositModify_Ind, 0 ) AS frmACHDirectDeposit, 
	            cast(0 as bit) AS frmVoluntaryWithholdings, 
	            cast(0 as bit) AS frmVoluntaryWithholdingsAccum, 
	            cast(0 as bit) AS frmTaxWithholdings, 
	            cast(0 as bit) AS frmWageAndOtherWithholdings, 
	            ISNULL( US.LaborDistributionModify_Ind, 0 ) AS frmPayrollLaborDistribution, 
	            cast(0 as bit) AS frmHrHistory, 
	            ISNULL( US.RequestedTimeOffModify_Ind, 0 ) AS frmAttendance, 
	            ISNULL( US.AccrualModify_Ind, 0 ) AS frmAccrual, 
	            ISNULL( US.BenefitsModify_Ind, 0 ) AS frmBenefits, 
	            ISNULL( US.DependentsBeneficiariesModify_Ind, 0 ) AS frmDependents, 
	            cast(0 as bit) AS frmSkills, 
	            cast(0 as bit) AS frmEducation, 
	            cast(0 as bit) AS frmFormerEmployer, 
	            ISNULL( US.EmployeeEventsModify_Ind, 0 ) AS frmEvents, 
	            ISNULL( US.EmergencyContactModify_Ind, 0 ) AS frmEmergency, 
	            cast(0 as bit) AS frmWellness, 
	            cast(0 as bit) AS frmOsha, 
	            ISNULL( US.MiscModify_Ind, 0 ) AS frmMiscellaneous, 
	            ISNULL( US.NotesModify_Ind, 0 ) AS frmNotes, 
	            cast(0 as bit) AS frmSecurityAccess, 
	            ISNULL( US.LicenseModify_Ind, 0 ) AS frmLicenses, 
	            cast(0 as bit) AS frmRelation, 
	            cast(0 as bit) AS frmAsset, 
	            ISNULL( US.EmployeeFilesModify_Ind, 0 ) AS frmAttachments, 
	            cast(0 as bit) AS frmWageandOtherEarnings, 
	            cast(0 as bit) AS frmTraining, 
	            ISNULL( US.CustomFieldsModify_Ind, 0 ) AS frmCustomFields, 
	            cast(0 as bit) AS frmCOBRA, 
	            ISNULL( US.TimeCardSetupModify_Ind, 0 ) AS frmTASetup, 
	            ISNULL( US.RequestedTimeOffView_Ind, 0 ) AS DisplayRequestedTimeOff_Ind, 
	            ISNULL( US.AccrualView_Ind, 0 ) AS DisplayAccrual_Ind  
            FROM Users U 
            LEFT OUTER JOIN UserSettings US
                         ON US.User_Cd = U.User_Cd 
            WHERE U.User_Cd = @cUser_Cd
         END
        ELSE
         BEGIN
            SELECT 
                U.NetchexLogin_Ind, 
                ISNULL( UAR.frmDemographicsEdit, 0 ) AS frmDemographicsEdit,
		        ISNULL( UAR.frmEEOInformation, 0 ) AS frmEEOInformation,
		        ISNULL( UAR.frmPrInfo, 0 ) AS frmPrInfo,
		        ISNULL( UAR.frmBasicPayrollSetup, 0 ) AS frmBasicPayrollSetup,
		        ISNULL( UAR.frmACHDirectDeposit, 0 ) AS frmACHDirectDeposit,
		        ISNULL( UAR.frmVoluntaryWithholdings, 0 ) AS frmVoluntaryWithholdings,
		        ISNULL( UAR.frmVoluntaryWithholdingsAccum, 0 ) AS frmVoluntaryWithholdingsAccum,
		        ISNULL( UAR.frmTaxWithholdings, 0 ) AS frmTaxWithholdings,
		        ISNULL( UAR.frmWageAndOtherWithholdings, 0 ) AS frmWageAndOtherWithholdings,
		        ISNULL( UAR.frmPayrollLaborDistribution, 0 ) AS frmPayrollLaborDistribution,
		        ISNULL( UAR.frmHrHistory, 0 ) AS frmHrHistory,
                --@TODO - Change PP.DisplayAttendance_Ind to UAR.frmAttendance when bits are split
		        ISNULL( PP.DisplayAttendance_Ind, 0 ) AS frmAttendance,
		        ISNULL( UAR.frmAttendance, 0 ) AS frmAccrual, 
		        ISNULL( UAR.frmBenefits, 0 ) AS frmBenefits, 
		        ISNULL( UAR.frmDependents, 0 ) AS frmDependents, 
		        ISNULL( UAR.frmSkills, 0 ) AS frmSkills, 
		        ISNULL( UAR.frmEducation, 0 ) AS frmEducation, 
		        ISNULL( UAR.frmFormerEmployer, 0 ) AS frmFormerEmployer, 
		        ISNULL( UAR.frmEvents, 0 ) AS frmEvents, 
		        ISNULL( UAR.frmEmergency, 0 ) AS frmEmergency, 
		        ISNULL( UAR.frmWellness, 0 ) AS frmWellness, 
		        ISNULL( UAR.frmOsha, 0 ) AS frmOsha, 
		        ISNULL( UAR.frmMiscellaneous, 0 ) AS frmMiscellaneous, 
		        ISNULL( UAR.frmNotes, 0 ) AS frmNotes, 
		        ISNULL( UAR.frmSecurityAccess, 0 ) AS frmSecurityAccess, 
		        ISNULL( UAR.frmLicenses, 0 ) AS frmLicenses, 
		        ISNULL( UAR.frmRelation, 0 ) AS frmRelation, 
		        ISNULL( UAR.frmAsset, 0 ) AS frmAsset, 
		        ISNULL( UAR.frmAttachments, 0 ) AS frmAttachments, 
		        ISNULL( UAR.frmWageandOtherEarnings, 0 ) AS frmWageandOtherEarnings, 
		        ISNULL( UAR.frmTraining, 0 ) AS frmTraining, 
		        ISNULL( UAR.frmCustomFields, 0 ) AS frmCustomFields, 
		        ISNULL( UAR.frmCOBRA, 0 ) AS frmCOBRA, 
		        ISNULL( UAR.frmTASetup, 0 ) AS frmTASetup, 
                -- @TODO - Split bits in Person_Preferences.  For now they are set since a user would not get to the Accrual / Attendance page if they could not view it.
		        cast (1 as bit) AS DisplayRequestedTimeOff_Ind, 
		        cast (1 as bit) AS DisplayAccrual_Ind
	        FROM Users U
            INNER JOIN UsersAccessRights UAR 
                    ON UAR.User_Cd = U.User_Cd 
            INNER JOIN HRPRemier.dbo.Person_Preferences PP 
                    ON PP.Employee_Cd = U.User_Cd
	        WHERE U.User_Cd = @cUser_Cd
         END

    END TRY

    ------------------------------------------------------------------------------------------------------------
    -- ERROR HANDLING:
    ------------------------------------------------------------------------------------------------------------
    BEGIN CATCH
        EXECUTE HRPremier.dbo.usp_LogErr 
        PRINT ERROR_MESSAGE()         
    END CATCH
GO
