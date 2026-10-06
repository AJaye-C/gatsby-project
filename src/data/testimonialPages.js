const intro = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus velit sem, vitae mollis dolor ultricies nec. Praesent odio mi, commodo accumsan libero vitae, finibus rhoncus mauris. Praesent non libero mattis, vulputate diam sed, convallis nunc. Fusce augue tortor, aliquam vel molestie volutpat, tincidunt at justo. Pellentesque lectus nunc, varius id posuere sit amet, finibus vitae est. Morbi venenatis ac nunc vulputate dignissim. Aliquam et volutpat sem. Sed ullamcorper suscipit viverra. Mauris auctor augue fringilla turpis aliquet commodo. Curabitur nunc augue, faucibus non bibendum sit amet, sagittis ut neque. Vivamus ac felis vel eros accumsan congue.",
  "Nunc eu maximus purus. Nunc posuere aliquet aliquam.\nAenean mauris nunc, mollis ut ornare vitae, venenatis fermentum purus. Nullam leo tortor, vestibulum vitae felis nec, aliquam feugiat nibh. Donec turpis arcu, pretium in blandit vel, mattis a enim. Aenean vestibulum urna eget efficitur luctus. Etiam sodales fringilla nisl non posuere. Duis posuere venenatis turpis, a pharetra purus vehicula a. Quisque eu vestibulum lorem, id interdum eros. In tempor vestibulum consequat. Aliquam sodales eu sapien nec consectetur. Etiam pulvinar scelerisque ullamcorper.",
];

const slides = [
  {
    id: "client-1",
    quote: [{ text: "Fun, innovative and unflappable. Pocket Creatives are great to work with – whether it’s finding the perfect lighting for a trifle to capturing GoPro footage on a whisk, they always approach every situation with a steady yet game-changing attitude. I see the whole team as trusted creative partners to make great content together." }],
    author: "Client Name",
    logo: null,
    placeholder: true,
  },
  {
    id: "client-2",
    quote: [{ text: "Fun, innovative and unflappable. " }, { text: "Pocket Creatives", emphasis: true }, { text: " are great to work with – whether it’s finding the perfect lighting for a trifle to capturing GoPro footage on a whisk, they always approach every situation with a steady yet game-changing attitude. I see the whole team as trusted creative partners to make great content together." }],
    author: "Client Name 2",
    logo: null,
    placeholder: true,
  },
  {
    id: "client-3",
    quote: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis purus vestibulum, commodo ante vitae, dignissim ligula. Maecenas at sodales." }],
    author: "Client Name 3",
    logo: null,
    placeholder: true,
  },
  {
    id: "client-4",
    quote: [{ text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis purus vestibulum, commodo ante vitae, dignissim ligula. Maecenas at sodales." }],
    author: "Client Name 4",
    logo: null,
    placeholder: true,
  },
];

const details = {
  heading: "Lorem ipsum dolor sit amet",
  image: null,
  columns: [
    {
      heading: "Lorem ipsum",
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt tellus leo, id tempor ligula dignissim ac. Nullam vel metus eros. Integer non ligula vitae augue dignissim molestie. Quisque bibendum massa vestibulum, convallis mi ac, dignissim urna. Praesent eu lorem a nisi convallis pretium ac eu nisi. Sed convallis dolor tellus, ut egestas risus imperdiet a. Etiam imperdiet felis ac pellentesque luctus. Quisque quis dui eu arcu sodales tempus. Duis sit amet vehicula velit. Donec vulputate porta eros id egestas. Donec non lectus a diam varius scelerisque.",
        "Sed fermentum libero et consectetur mattis. Duis ut dui suscipit dui aliquam elementum ac eget libero. In eget enim nibh. Mauris eget ullamcorper leo. Mauris eget ante eu odio auctor pharetra eget sit amet tellus. Ut hendrerit ipsum orci, quis tempor mi suscipit id. Pellentesque a sollicitudin mauris. Vivamus rutrum orci sed felis eleifend fringilla. Mauris id fringilla sapien, eget semper nulla.",
      ],
    },
    {
      heading: "Dolor Sit Amet",
      paragraphs: [
        "Sed fermentum libero et consectetur mattis. Duis ut dui suscipit dui aliquam elementum ac eget libero. In eget enim nibh. Mauris eget ullamcorper leo. Mauris eget ante eu odio auctor pharetra eget sit amet tellus. Ut hendrerit ipsum orci, quis tempor mi suscipit id. Pellentesque a sollicitudin mauris. Vivamus rutrum orci sed felis eleifend fringilla. Mauris id fringilla sapien, eget semper nulla.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt tellus leo, id tempor ligula dignissim ac. Nullam vel metus eros. Integer non ligula vitae augue dignissim molestie. Quisque bibendum massa vestibulum, convallis mi ac, dignissim urna. Praesent eu lorem a nisi convallis pretium ac eu nisi. Sed convallis dolor tellus, ut egestas risus imperdiet a. Etiam imperdiet felis ac pellentesque luctus. Quisque quis dui eu arcu sodales tempus. Duis sit amet vehicula velit. Donec vulputate porta eros id egestas. Donec non lectus a diam varius scelerisque.",
      ],
    },
  ],
};

const pages = {
  photography: { slug: "photography", heading: "Photography Testimonials", introLayout: "stacked", intro, slides, contact: { heading: "We’d love to hear about you!", paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id massa aliquam, imperdiet risus non, volutpat ligula. Nam pharetra eu leo a ultrices. Suspendisse potenti. Phasellus nunc enim, bibendum nec leo eu, pellentesque ultrices ipsum. Praesent pretium nisl sapien, ac." }, details },
  videography: { slug: "videography", heading: "Video Production Testimonials", introLayout: "split", intro, slides, contact: { heading: "We’d love to hear about you!", paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id massa aliquam, imperdiet risus non, volutpat ligula. Nam pharetra eu leo a ultrices. Suspendisse potenti. Phasellus nunc enim, bibendum nec leo eu, pellentesque ultrices ipsum. Praesent pretium nisl sapien, ac." }, details },
};

export const getTestimonialPage = (slug) => pages[slug];