namespace NetchexAngular.Models.Attributes
{
    using System.ComponentModel.DataAnnotations;
    using System.Web.Mvc;

    public class PasswordAttribute : UIHintAttribute, IMetadataAware
    {
        private TextboxSize _textboxSize = TextboxSize.XLarge;
        private string _placeholderText = string.Empty;

        public PasswordAttribute()
            : base("Password")
        {            
        }

        public TextboxSize TextboxSize
        {
            get { return _textboxSize; }
            set { _textboxSize = value; }
        }

        public string PlaceholderText
        {
            get { return _placeholderText; }
            set { _placeholderText = value; }
        }

        public void OnMetadataCreated(ModelMetadata metadata)
        {
            metadata.AdditionalValues["textbox-size"] = _textboxSize;
            metadata.AdditionalValues["placeholder"] = _placeholderText;
        }
    }
}