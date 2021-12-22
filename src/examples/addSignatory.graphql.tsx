import { AddSignatoryInput } from "../../graphql-signatures-types";
import { ExampleData } from '../state/store';

export const query = /* Signatures GraphQL */`
mutation exampleAddSignatory(
  $input: AddSignatoryInput!
) {
  addSignatory(input: $input) {
    signatory {
      id
      href
    }
  }
}
`;

export const variables = (data: ExampleData) : {input: AddSignatoryInput} => ({
  input: {
    signatureOrderId: data?.createSignatureOrder?.signatureOrder.id || "[signatureOrder.id]"
  }
});