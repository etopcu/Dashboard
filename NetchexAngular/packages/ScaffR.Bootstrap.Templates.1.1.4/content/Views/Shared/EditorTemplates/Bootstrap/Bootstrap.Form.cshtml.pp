@foreach (var prop in ViewData.ModelMetadata.Properties.Where(pm => pm.ShowForDisplay && !ViewData.TemplateInfo.Visited(pm)))
{
    if (prop.HideSurroundingHtml)
    {
    <text>@Html.Display(prop.PropertyName)</text>
    }
    else
    {
    <div class="control-group">

        <label class="control-label">
            @prop.GetDisplayName()
        </label>
        <div class="controls">
            @Html.Editor(prop.PropertyName)
            @Html.ValidationMessage(prop.PropertyName, new{@class = "help-inline"})
        </div>

    </div>                 
    }
}