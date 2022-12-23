/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQrEntry = /* GraphQL */ `
  query GetQrEntry($id: ID!) {
    getQrEntry(id: $id) {
      id
      link
      full
      createdAt
      updatedAt
    }
  }
`;
export const listQrEntrys = /* GraphQL */ `
  query ListQrEntrys(
    $filter: ModelQrEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQrEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        link
        full
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
