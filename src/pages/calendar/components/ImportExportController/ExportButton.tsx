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

		const downloadLink = document.createElement("a")
		downloadLink.href = blobUrl
		downloadLink.download = "calendar.json"
		downloadLink.style.display = "none"


		document.body.appendChild(downloadLink)
		downloadLink.click()
		document.body.removeChild(downloadLink)
		URL.revokeObjectURL(blobUrl)
	}

	return (
		<Button onClick={handleImportData}>
			Export data
		</Button>
	)
}
