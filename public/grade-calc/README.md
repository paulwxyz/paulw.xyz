# Grade Calculator

Some professors do not properly configure the Canvas grade percentages based on their syllabus. Instead, they opt to use Excel to calculate the final grades after everything. It can be hard to estimate how much effort I should allocate for those classes without making an Excel file.

So I wrote this to quickly configure a calculator to see what I will end up getting in a class based on how much effort I put in.

## Short Summary of the JSON structure

The JSON is expected to have an array of section descriptions.

`name : string` is used as the class name. They have to be unique for each section to work as expected.

`title : string` is used as the heading for the sections.

`percentage : number` is used to weigh the section for the final grade.

`output : boolean` when true, it calculates the section score.

`points : [number]` used for each assignment in the section.

`bothMethods : boolean` when true, the weighted and unweighted scores are calculated.

`info : string` used for section description.