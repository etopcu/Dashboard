
<table class="table table-bordered">
    

@foreach (var prop in ViewData.ModelMetadata.Properties.Where(pm => pm.ShowForDisplay && !ViewData.TemplateInfo.Visited(pm)))
{
    if (prop.HideSurroundingHtml)
    {
    <text>@Html.Display(prop.PropertyName)</text>
    }
    else
    {
        <tr>
            <th style="width: 25%">@prop.GetDisplayName()</th>
            <td>
                @Html.Display(prop.PropertyName)
            </td>
        </tr>
           
    }
}
    
    </table>