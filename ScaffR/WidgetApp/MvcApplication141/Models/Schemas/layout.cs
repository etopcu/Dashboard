﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.17929
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System.Xml.Serialization;

// 
// This source code was auto-generated by xsd, Version=4.0.30319.17929.
// 


namespace MvcApplication141.Models.Schemas
{
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("xsd", "4.0.30319.17929")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [XmlType(AnonymousType=true, Namespace="http://tempuri.org/widget.xsd")]
    [XmlRoot(Namespace="http://tempuri.org/widget.xsd", IsNullable=false)]
    public partial class Layout {
    
        private string nameField;
    
        private string thumbnailField;
    
        private int orderField;
    
        private string htmlValueField;
    
        /// <remarks/>
        public string Name {
            get {
                return this.nameField;
            }
            set {
                this.nameField = value;
            }
        }
    
        /// <remarks/>
        public string Thumbnail {
            get {
                return this.thumbnailField;
            }
            set {
                this.thumbnailField = value;
            }
        }
    
        /// <remarks/>
        public int Order {
            get {
                return this.orderField;
            }
            set {
                this.orderField = value;
            }
        }
    
        /// <remarks/>
        public string HtmlValue {
            get {
                return this.htmlValueField;
            }
            set {
                this.htmlValueField = value;
            }
        }
    }
}
