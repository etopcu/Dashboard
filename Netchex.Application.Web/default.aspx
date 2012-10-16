<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Netchex.Application.Web.Default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Classic ASP</title>
    <script src="Scripts/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="Scripts/jquery-ui-1.8.11.js"></script>
    <link href="Content/global.css" rel="stylesheet" type="text/css" />
</head>
<body>
<form runat="server">
    <div id="eeMenu"></div>
    

    <script type="text/javascript">
        $(function () {            
            $('#eeMenu').load('Dashboard/Index');                
        });        
    </script>
</form>
</body>
</html>
