using Criipto.Signatures;
using Criipto.Signatures.Models;

using (var client = new CriiptoSignaturesClient("{YOUR_CRIIPTO_CLIENT_ID}", "{YOUR_CRIIPTO_CLIENT_SECRET}")) {
    // Setup document input
    var documents = new List<DocumentInput>{
        new DocumentInput {
            pdf = new PadesDocumentInput {
                title = "Dotnet Sample",
                blob = new Byte[64], // Should be the bytes of a PDF file
                storageMode = DocumentStorageMode.Temporary
            }
        }
    };

    // Setup signature order input
    var createSignatureOrderInput = new CreateSignatureOrderInput
    {
        title = "Dotnet Sample",
        documents = documents
    };

    // Create signature order
    var signatureOrder = await client.CreateSignatureOrder(createSignatureOrderInput);

    // Add signatory
    var signatory = await client.AddSignatory(
        signatureOrder.id,
        new AddSignatoryInput() {
            signatureAppearance = new SignatureAppearanceInput() {
                identifierFromEvidence = new (),
                footer = new List<SignatureAppearanceTemplateInput>() {
                    new SignatureAppearanceTemplateInput() {
                        template = "Document ID: {{$document.id}}",
                        replacements = null
                    }
                }
            }
        }
    );
    Console.WriteLine(signatory.href); // Signing link, redirect user to this link, or send it in an email
}
