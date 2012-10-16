﻿using System;

namespace Netchex.Domain.Commons
{
    public static class MyExtensions
    {
        public static string Left(this String str, int length)
        {
            if (length > str.Length)
                throw new Exception("Length is longer than string");
            return str.Substring(0, length);
        }

        public static string Right(this String str, int length)
        {
            if (length > str.Length)
                throw new Exception("Length is longer than string");
            return str.Substring(str.Length - length, length);
        }

        public static bool IsEmpty(this String str)
        {
            return str.Equals(String.Empty);
        }

        public static bool In(this String str, String[] contents)
        {
            for (int i = 0; i < contents.Length; i++)
                if (contents[i] == str)
                    return true;
            return false;
        }

        public static string MaskValue(this String str, string mask)
        {
            var builder = new System.Text.StringBuilder();
            var maskIndex = 0;
            var valueIndex = 0;
            while (maskIndex < mask.Length && valueIndex < str.Length)
            {
                if (mask[maskIndex] == '-')
                {
                    builder.Append('-');
                    maskIndex++;
                }
                else
                {
                    builder.Append(str[valueIndex]);
                    maskIndex++;
                    valueIndex++;
                }
            }

            // Add in the remainder of the value 
            if (valueIndex + 1 < str.Length)
            {
                builder.Append(str.Substring(valueIndex));
            }

            return builder.ToString();
        }

    }
}