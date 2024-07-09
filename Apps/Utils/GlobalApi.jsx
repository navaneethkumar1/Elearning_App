// // Utils/GlobalApi.jsrr
// import { gql, request } from 'graphql-request/build/entrypoints/main';
// const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/clybie0rr02g107urazvoq2vw/master";

// const getCategory = async () => {
//   const query = gql`
//     query GetCategory {
//       categories {
//         id
//         name
//         icon {
//           url
//         }
//       }
//     }
//   `;
//   const result = await request(MASTER_URL, query);
//   return result;
// }

// export default {
//   getCategory
// };

// TestGraphqlRequest.js
import { request, gql } from 'graphql-request';

const MASTER_URL = "https://ap-south-1.cdn.hygraph.com/content/clybie0rr02g107urazvoq2vw/master";

const getCategory = async () => {
  const query = gql`
    query GetCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;
  try {
    const result = await request(MASTER_URL, query);
    console.log(result);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

getCategory();
