**_Pre Assignment Questions/Answers_**

**_What do you think are the greatest areas of risk in completing the project?_**

- API Rate Limits: Heavy use of GitHub's endpoint might exceed rate limits, potentially disrupting the autocomplete feature.

- Data Storage: Using the file system for data isn't production-ready. A backend database ensures durability and prevents data loss.

- Performance: As user or data count grows, performance may drop.

- Dependencies: Using third-party tools has risks. They might have unresolved bugs, or support could cease.

**_What changes/additions would you make to the design?_**

- Chart Clarity: Limiting the number of items on the chart can prevent overcrowding and improve readability.

- Enhanced Axis: Values on the X and Y axis provide a clearer context to the data points.

- Responsive Design: Ensure the design is optimized for various screen sizes.

- Set Color Scheme (ties in with Chart Clarity): use colors that caters to different visual abilities. Prevent colors that are too similar.

**_List two or three features that you would consider implementing in the future that would add significant value to the project._**

1. Repo Owner Display: Show owner details for trust and context. There's a owner property in the github search endpoint.

2. Advanced Search & Filter: View weekly/yearly commits. Filter By Tags & Languages.

3. More Engagement on the Watch card: Fork & Clone and quick link to issues or version.

**_Are there any clarifying questions you would ask? If you're able to make assumptions about these and continue, please record and share your assumptions_**

- what does the input search ? does it include owner name ? search icon clickable, how many items should show up, more search UX questions.

- Should there be marks/labels on the chart axis?

- Should there be a Title on the chart?

- what does the tooltip look like with multiple repos with the same commit value?

Assumptions:

I am following the figma and will limit the first 10. and as per A/C, will ONLY search repository by name only.
