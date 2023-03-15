// this will allow us to import our variable
// the following lines are required to initialize a Notion client
const { Client } = require("@notionhq/client");

const token_id = process.env.NOTION_TOKEN;
const database_id = process.env.NOTION_DATABASE_ID;

// this line initializes the Notion Client using our key
const notion = new Client({
  auth: "secret_0dBn1DFW6TPgCRGf8POcVQVOdFZ02KfWI0JpXeHgrsK",
  //auth: "secret_4lrws2Ic8Yv1SrBOWGwicLpoGkrqrpDFrnRHmZBbpGe",
});

module.exports.getDatabase = async function () {
  const response = await notion.databases.query({
    database_id: "83a0f069e9ba4c7fa80db64304d851e2",
    // database_id: process.env.NOTION_DATABASE_ID,
    //database_id: "f990d49fb610448a8399d3c0bf7349b7",
  });

  const responseResults = response.results.map((page) => {
    return {
      id: page.id,
      name: page.properties.Name.title[0]?.plain_text,
    };
  });
  console.log(responseResults);
  return responseResults;
};

module.exports.newEntryToDatabase = async function (
  name,
  phone,
  comment,
  location
) {
  const response = await notion.pages.create({
    parent: {
      //database_id: database_id,
      database_id: "83a0f069e9ba4c7fa80db64304d851e2",
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Phone: {
        phone_number: phone,
      },
      Comment: {
        rich_text: [
          {
            text: {
              content: comment,
            },
          },
        ],
      },
      Status: {
        rich_text: [
          {
            text: {
              content: "App",
            },
          },
        ],
      },
      Location: {
        select: {
          name: location,
        },
      },
    },
  });

  return response;
};
