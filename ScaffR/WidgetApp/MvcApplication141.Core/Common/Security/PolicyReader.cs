namespace MvcApplication141.Core.Common.Security
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Security.Claims;
    using System.Xml;

    internal class PolicyReader
    {
        // for more information see http://msdn.microsoft.com/en-us/library/system.security.claims.claimsauthorizationmanager.loadcustomconfiguration.aspx

        static readonly Expression<Func<ClaimsPrincipal, bool>> DefaultPolicy = icp => false;
        static readonly Expression<Func<ClaimsPrincipal, bool>> AllowAccessForDefaultPagePolicy = icp => true;

        delegate bool HasClaimDelegate(ClaimsPrincipal p, string claimType, string claimValue);

        /// <summary>
        /// Delegate that checks if the associated claimsPrincipal has the claim specified
        /// </summary>
        static readonly HasClaimDelegate HasClaim =
            (p, claimType, claimValue) => p.Claims.Any(c => c.Type == claimType &&
                                                            c.ValueType == ClaimValueTypes.String &&
                                                            c.Value == claimValue);

        public Expression<Func<ClaimsPrincipal, bool>> ReadPolicy(XmlDictionaryReader rdr)
        {
            if (rdr.Name != "policy")
            {
                throw new InvalidOperationException("Invalid policy document");
            }

            rdr.Read();

            if (!rdr.IsStartElement())
            {
                rdr.ReadEndElement();
                return AllowAccessForDefaultPagePolicy;
            }

            ParameterExpression subject = Expression.Parameter(typeof(ClaimsPrincipal), "subject");
            Expression<Func<ClaimsPrincipal, bool>> result = ReadNode(rdr, subject);

            rdr.ReadEndElement();

            return result;
        }

        private Expression<Func<ClaimsPrincipal, bool>> ReadNode(XmlDictionaryReader rdr, ParameterExpression subject)
        {
            Expression<Func<ClaimsPrincipal, bool>> policyExpression;

            if (!rdr.IsStartElement())
            {
                throw new InvalidOperationException("Invalid Policy format.");
            }

            switch (rdr.Name)
            {
                case "and":
                    policyExpression = ReadAnd(rdr, subject);
                    break;
                case "or":
                    policyExpression = ReadOr(rdr, subject);
                    break;
                case "claim":
                    policyExpression = ReadClaim(rdr);
                    break;
                default:
                    policyExpression = DefaultPolicy;
                    break;
            }

            return policyExpression;
        }

        private Expression<Func<ClaimsPrincipal, bool>> ReadClaim(XmlDictionaryReader rdr)
        {
            string claimType = rdr.GetAttribute("claimType");
            string claimValue = rdr.GetAttribute("claimValue");

            Expression<Func<ClaimsPrincipal, bool>> hasClaim = icp => HasClaim(icp, claimType, claimValue);

            rdr.Read();

            return hasClaim;
        }

        private Expression<Func<ClaimsPrincipal, bool>> ReadOr(XmlDictionaryReader rdr, ParameterExpression subject)
        {
            rdr.Read();

            BinaryExpression lambda1 = Expression.OrElse(
                Expression.Invoke(ReadNode(rdr, subject), subject),
                Expression.Invoke(ReadNode(rdr, subject), subject));

            rdr.ReadEndElement();

            Expression<Func<ClaimsPrincipal, bool>> lambda2 = Expression.Lambda<Func<ClaimsPrincipal, bool>>(lambda1, subject);
            return lambda2;
        }

        private Expression<Func<ClaimsPrincipal, bool>> ReadAnd(XmlDictionaryReader rdr, ParameterExpression subject)
        {
            rdr.Read();

            BinaryExpression lambda1 = Expression.AndAlso(
                Expression.Invoke(ReadNode(rdr, subject), subject),
                Expression.Invoke(ReadNode(rdr, subject), subject));

            rdr.ReadEndElement();

            Expression<Func<ClaimsPrincipal, bool>> lambda2 = Expression.Lambda<Func<ClaimsPrincipal, bool>>(lambda1, subject);
            return lambda2;
        }
    }
}