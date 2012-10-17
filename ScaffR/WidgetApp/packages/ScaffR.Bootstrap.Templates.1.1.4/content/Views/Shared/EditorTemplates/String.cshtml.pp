﻿@using $rootnamespace$.Models.Attributes
@{
    
    var placeholder = string.Empty;
    var textboxSize = TextboxSize.XLarge;
    var classes = new List<string>();
    var mask = string.Empty;
    
    var requiredClass = ViewData.ModelMetadata.IsRequired ? "required" : "";
    
    if (ViewData.ModelMetadata.AdditionalValues.ContainsKey("placeholder"))
    {
        placeholder = ViewData.ModelMetadata.AdditionalValues["placeholder"] as string;
    }

    if (ViewData.ModelMetadata.AdditionalValues.ContainsKey("textbox-size"))
    {
        textboxSize = (TextboxSize)ViewData.ModelMetadata.AdditionalValues["textbox-size"];
    }
    
    if(ViewData.ModelMetadata.AdditionalValues.ContainsKey("mask"))
    {
        mask = ViewData.ModelMetadata.AdditionalValues["mask"] as string;    
    }

    classes.Add(requiredClass);    
    classes.Add(("input-" + textboxSize).ToLower());

    var @class = string.Join(" ", classes);    
}

@Html.TextBox("", ViewData.TemplateInfo.FormattedModelValue, new { @class, placeholder, data_mask=mask })