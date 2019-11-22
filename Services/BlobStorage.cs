using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace TestDragDropPdf.Services
{
    public class BlobStorage
    {
        public string ConnectionString =
            "";

        private CloudStorageAccount Account { get; }
        public CloudBlobClient ServiceClient { get; }

        public BlobStorage()
        {
            Account = CloudStorageAccount.Parse(ConnectionString);
            ServiceClient = Account.CreateCloudBlobClient();
        }

        public CloudBlobContainer GetSDIContainer()
        {
            return ServiceClient.GetContainerReference("test");
        }

        public async Task<string> UploadStreaImage(Stream stream, string imageurl, string imageName)
        {
            var filename = imageurl.Split('/').Last();
            var clob = GetSDIContainer().GetBlockBlobReference(filename);
            await clob.DeleteIfExistsAsync();

            var clobUPDATED = GetSDIContainer().GetBlockBlobReference(imageName);

            await clobUPDATED.UploadFromStreamAsync(stream);

            return clobUPDATED.Uri.AbsoluteUri;
        }





    }
}
