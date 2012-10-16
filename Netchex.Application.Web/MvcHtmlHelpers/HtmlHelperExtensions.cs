using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace Netchex.Application.Web.MvcHtmlHelpers
{
    public static class HtmlHelperExtensions
    {

        public static MvcHtmlString LabelWithTooltip<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression)
        {
            var metaData = ModelMetadata.FromLambdaExpression(expression, helper.ViewData);

            string htmlFieldName = ExpressionHelper.GetExpressionText(expression);
            string labelText = metaData.DisplayName ?? metaData.PropertyName ?? htmlFieldName.Split('.').Last();

            if (String.IsNullOrEmpty(labelText))
                return MvcHtmlString.Empty;

            var label = new TagBuilder("label");
            label.Attributes.Add("for", helper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldId(htmlFieldName));

            if (!string.IsNullOrEmpty(metaData.Description))
                label.Attributes.Add("title", metaData.Description);

            label.SetInnerText(labelText);
            return MvcHtmlString.Create(label.ToString());
        }

    }
}