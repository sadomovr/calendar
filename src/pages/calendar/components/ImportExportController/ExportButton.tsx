import { Button } from "../../../../app/ui/Button";
import { labelService } from "../../../../app/services/label.service.ts";
import { taskService } from "../../../../app/services/task.service.ts";


export const ExportButton = () => {
	const handleImportData = () => {
		const labels = labelService.getLabels()
		const tasks = taskService.getAllTasks()

		const data = {
			labels, tasks
		}

		const jsonData = JSON.stringify(data )
		const blob = new Blob([jsonData], { type: 'application/json' } )
		const blobUrl = URL.createObjectURL( blob )

		// Create a download link
		const downloadLink = document.createElement("a");
		downloadLink.href = blobUrl;
		downloadLink.download = "my_object.json"; // Specify the filename here
		downloadLink.style.display = "none"; // Hide the link

		// Append the download link to the document
		document.body.appendChild(downloadLink);

		// Trigger a click on the link to start the download
		downloadLink.click();

		// Clean up: remove the download link and revoke the Blob URL
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(blobUrl);
	}

	return (
		<Button onClick={handleImportData}>
			Export data
		</Button>
	)
}
