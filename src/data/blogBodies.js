const paragraph = (text) => ({ type: "paragraph", text });
const heading = (text) => ({ type: "heading", text });
const subheading = (text) => ({ type: "subheading", text });
const list = (items) => ({ type: "list", items });

export const blogBodies = {
  "what-is-a-treatment-in-video-production-expert-answers": [
    paragraph("Ever had a brilliant video idea but struggled to communicate it clearly? Whether you’re planning a product video, brand film, or social media advert, ensuring everyone shares the same vision is crucial. That’s where a treatment comes in."),
    paragraph("But what is a treatment in video production? It’s a concise, structured document outlining your video’s concept, tone, narrative, and stylistic approach. It acts as a roadmap before scriptwriting, helping directors, clients, and production teams stay aligned."),
    paragraph("A well-structured video treatment ensures clarity, minimises revisions, and keeps your creative vision intact. But what does it look like? And how do you write one? In this guide, we’ll break down everything you need to know – from step-by-step structuring to common mistakes to avoid."),
    heading("What is a Treatment in Video Production?"),
    paragraph("A video treatment is a pre-production document that summarises a project’s creative vision, story structure, and stylistic approach. It’s often used before scriptwriting to define the mood, tone, and key messaging of the video."),
    paragraph("A treatment is particularly useful for:"),
    list(["Aligning stakeholders – ensuring everyone shares the same creative vision.", "Pitching ideas – helping clients, investors, or internal teams approve a concept.", "Minimising revisions – reducing confusion and costly reshoots during production."]),
    heading("Treatment vs. Script vs. Storyboard – What’s the Difference?"),
    paragraph("Document Purpose Focus"),
    paragraph("Treatment High-level concept & visual style Big-picture storytelling"),
    paragraph("Script Detailed dialogue & scene actions Every word & movement"),
    paragraph("Storyboard Shot-by-shot visual representation Camera angles & flow"),
    paragraph("If you’re wondering what is a treatment in video production, it’s essentially the first step to transforming an idea into a fully structured video concept."),
    heading("Different Types of Video Treatments & Their Use-Cases"),
    paragraph("Not all video treatments are created equal! Depending on the type of video, a treatment can vary significantly in structure, tone, and purpose. Here’s how treatments differ based on video type:"),
    subheading("Commercial Video Treatment"),
    list(["Used by brands to develop advertising concepts before production.", "Focuses on storytelling, emotional triggers, and brand messaging.", "Often includes a mood board, visual style guide, and proposed call-to-action (CTA)."]),
    subheading("Corporate Video Treatment"),
    list(["Ideal for company overview videos, testimonials, or training content.", "Emphasises clarity, professionalism, and messaging alignment.", "Keeps the audience, structure, and intended action clear."]),
    subheading("Event Video Treatment"),
    list(["Guides the filming of conferences, product launches, or live events.", "Details multi-camera setups, key interview shots, crowd interactions, and event highlights.", "Ensures smooth coverage with a shot list and schedule."]),
    subheading("Social Media Video Treatment"),
    list(["Short-form, engaging, and highly visual.", "Optimised for Instagram Reels, TikTok, and YouTube Shorts.", "Focuses on snappy edits, eye-catching transitions, and mobile-friendly framing."]),
    paragraph("At Pocket Creatives, we tailor each treatment to match the brand’s goals, audience, and video platform – ensuring every project delivers maximum impact! If you’re still asking what is a treatment in video production, the answer is it’s an essential blueprint for video success."),
    heading("Why is a Video Treatment Important?"),
    paragraph("A video production treatment isn’t just a creative exercise – it’s a practical tool that saves time, money, and confusion."),
    subheading("Key Benefits:"),
    list(["Clarity & Direction – A well-structured treatment eliminates misinterpretation between teams.", "Client Approvals – Treatments provide a clear preview of the video’s message before investing in production.", "Fewer Revisions – A solid treatment reduces back-and-forth changes, cutting production delays.", "Professionalism – Agencies and brands expect structured treatments before committing to large-scale projects.", "Brand Consistency – A well-written treatment improves creative alignment and strengthens brand consistency."]),
    paragraph("By outlining visual and messaging guidelines upfront, businesses can ensure that every video reflects their brand identity. This makes marketing efforts more cohesive across different campaigns, improving audience trust and recognition."),
    paragraph("For example, when working on a crowdfunding video for a beauty brand, a treatment can refine the product’s visual story before production and help avoid mid-project changes."),
  ],
  "placeholder-company-post": [
    paragraph("This temporary article is a placeholder for a future company story. It demonstrates the post layout without headings, so the article can be read naturally without a table of contents."),
    paragraph("A finished version will describe the project context, creative approach, and useful production details once the editorial copy has been approved."),
    list(["Clear goals and audience.", "A considered visual direction.", "A review process that keeps the work focused."]),
  ],
};

export const getGeneratedBody = (post) => blogBodies[post.slug] || [
  paragraph(`This is temporary generated copy for ${post.title}. It will be replaced with the approved article before publication.`),
  heading(`Planning ${post.title}`),
  paragraph("Strong creative work begins with a clear purpose, a defined audience, and a shared understanding of the story. The production process can then give each visual decision a useful role."),
  list(["A clear creative direction.", "A visual plan that supports the message.", "A review process that protects the final result."]),
  heading("The creative approach"),
  paragraph("From photography to video, thoughtful preparation helps a team move from an initial idea to a polished piece of communication. This temporary article keeps the layout representative while the final copy is prepared."),
  heading("What to take forward"),
  paragraph("Every project benefits from a concise brief, consistent feedback, and space to refine the details. The finished article will add the specific approved information for this post."),
];
