namespace kmserver.Utils
{
    public class RandomStringGenerator
    {
        private static Random random = new Random();

        public static string Generate(int length)
        {
            if(length < 0)
                throw new ArgumentOutOfRangeException("length");

            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
