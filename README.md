<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="center">
  Fuzzy String Matching Algorithm
</h1>

<h2>
  Levenshtein Distance
</h2>
<p>
  Approximate distance between two strings is calculated using number of edits required (insertions, deletions,and substitutions) to change one string into another.
</p>
<h2>
  Trigram Distance
</h2>
<p>
  String similarity is determined by splitting each string into trigrams, a series of three characters, and then assessing number of matching versus unique trigrams between the two strings. In order to offset the heavy penalty for strings not starting or ending with the same trigram, a trigram is created for both strings containing a padding character and the first two characters as well as the last two characters and a padding character. This algorithm is more suited for longer character strings.
</p>
<h2>
  Jaro Distance
</h2>
<p>
  String similarity is determined by using a formula derived by Matthew Jaro; it considers the number of matches, length of strings, and number of single transpositions that would turn one string into the other.
</p>
<h2>
  Jaro-Winkler Distance
</h2>
<p>
  This similarity calculation is a varient of the Jaro Distance created by William Winkler. It incorporates the length of similar characters in the prefix (up to 4) to more heavily factor similarity between strings with common prefixes.
</p>