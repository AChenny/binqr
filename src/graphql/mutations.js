/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQrEntry = /* GraphQL */ `
  mutation CreateQrEntry(
    $input: CreateQrEntryInput!
    $condition: ModelQrEntryConditionInput
  ) {
    createQrEntry(input: $input, condition: $condition) {
      id
      desc
      link
      full
      location
      s3link
      createdAt
      updatedAt
    }
  }
`;
export const updateQrEntry = /* GraphQL */ `
  mutation UpdateQrEntry(
    $input: UpdateQrEntryInput!
    $condition: ModelQrEntryConditionInput
  ) {
    updateQrEntry(input: $input, condition: $condition) {
      id
      desc
      link
      full
      location
      s3link
      createdAt
      updatedAt
    }
  }
`;
export const deleteQrEntry = /* GraphQL */ `
  mutation DeleteQrEntry(
    $input: DeleteQrEntryInput!
    $condition: ModelQrEntryConditionInput
  ) {
    deleteQrEntry(input: $input, condition: $condition) {
      id
      desc
      link
      full
      location
      s3link
      createdAt
      updatedAt
    }
  }
`;
