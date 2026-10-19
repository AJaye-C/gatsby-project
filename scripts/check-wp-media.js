const fs = require("fs");
const path = require("path");

const pageDataRoot = path.resolve(__dirname, "..", "public", "page-data");
const layoutChecks = {
  WpPageBuilderSectionsHeroVideoLayout: [
    { field: "video", getMedia: (section) => section.video },
  ],
  WpPageBuilderSectionsVideoReviewsLayout: [
    { field: "video", getMedia: (section) => section.video },
  ],
  WpPageBuilderSectionsPageHeroLayout: [
    { field: "headingImage", getMedia: (section) => section.headingImage },
  ],
  WpPageBuilderSectionsIntroBannerLayout: [
    { field: "badge", getMedia: (section) => section.badge },
  ],
  WpPageBuilderSectionsBadgeCardsLayout: [
    {
      field: "cardItems[].badge",
      getItems: (section) => section.cardItems,
      getMedia: (item) => item.badge,
    },
  ],
  WpPageBuilderSectionsImageTextBandLayout: [
    {
      field: "bandItems[].badge",
      getItems: (section) => section.bandItems,
      getMedia: (item) => item.badge,
    },
    {
      field: "bandItems[].badgeHover",
      getItems: (section) => section.bandItems,
      getMedia: (item) => item.badgeHover,
    },
  ],
  WpPageBuilderSectionsIntroCardsLayout: [
    {
      field: "introCardItems[].icon",
      getItems: (section) => section.introCardItems,
      getMedia: (item) => item.icon,
    },
  ],
};

const pageDataFiles = [];

const collectPageDataFiles = (directory) => {
  if (!fs.existsSync(directory)) {
    throw new Error(`Page data directory not found: ${directory}. Run gatsby build first.`);
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectPageDataFiles(entryPath);
    } else if (entry.name === "page-data.json") {
      pageDataFiles.push(entryPath);
    }
  }
};

const mediaUrl = (media) => media?.node?.mediaItemUrl || "none";
const pageRecords = [];
const pagesByLayout = Object.fromEntries(Object.keys(layoutChecks).map((layout) => [layout, new Set()]));

collectPageDataFiles(pageDataRoot);

for (const filePath of pageDataFiles) {
  let pageData;
  try {
    pageData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Could not read ${filePath}: ${error.message}`);
  }

  const wpPage = pageData.result?.data?.wpPage;
  const sections = wpPage?.pageBuilder?.sections || [];
  const slug = wpPage?.slug || pageData.path || path.relative(pageDataRoot, path.dirname(filePath));

  for (const section of sections) {
    if (!section) continue;
    const checks = layoutChecks[section.__typename];
    if (!checks) continue;
    pagesByLayout[section.__typename].add(slug);

    for (const check of checks) {
      if (check.getItems) {
        const items = check.getItems(section);
        if (!Array.isArray(items) || items.length === 0) {
          pageRecords.push({
            slug,
            layout: section.__typename,
            field: check.field,
            itemIndex: "-",
            url: "none",
            status: "EMPTY",
          });
          continue;
        }

        items.forEach((item, itemIndex) => {
          const url = mediaUrl(check.getMedia(item || {}));
          pageRecords.push({
            slug,
            layout: section.__typename,
            field: check.field,
            itemIndex,
            url,
            status: url === "none" ? "EMPTY" : "OK",
          });
        });
        continue;
      }

      const url = mediaUrl(check.getMedia(section));
      pageRecords.push({
        slug,
        layout: section.__typename,
        field: check.field,
        itemIndex: "-",
        url,
        status: url === "none" ? "EMPTY" : "OK",
      });
    }
  }
}

console.log("Pages containing each checked layout:");
for (const layout of Object.keys(layoutChecks)) {
  const slugs = [...pagesByLayout[layout]];
  console.log(`${layout}: ${slugs.length ? slugs.join(", ") : "none"}`);
}

console.log("");
console.log("page slug | layout | field | item index | status | mediaItemUrl");
for (const record of pageRecords) {
  console.log(
    `${record.slug} | ${record.layout} | ${record.field} | ${record.itemIndex} | ${record.status} | ${record.url}`,
  );
}
