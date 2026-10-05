import { readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const videoChunksPath = join(process.cwd(), "public", "video_chunks");
    
    // Get all folders in video_chunks
    const folders = await readdir(videoChunksPath, { withFileTypes: true });
    const chunkFolders = folders.filter((dirent) => dirent.isDirectory());

    // Shuffle the folders array to randomize video order
    const shuffledFolders = chunkFolders.sort(() => Math.random() - 0.5);

    const allVideos: string[] = [];

    // Scan each folder for .mp4 files (folders are now in random order)
    for (const folder of shuffledFolders) {
      const folderPath = join(videoChunksPath, folder.name);
      const files = await readdir(folderPath);
      
      const mp4Files = files
        .filter((file) => file.endsWith(".mp4"))
        .map((file) => `/video_chunks/${folder.name}/${file}`);
      
      // Sort chunks within each folder to maintain sequential order
      mp4Files.sort();
      
      allVideos.push(...mp4Files);
    }

    return Response.json({ videos: allVideos });
  } catch (err) {
    console.error("Error reading video chunks:", err);
    return Response.json({ videos: [] });
  }
}
