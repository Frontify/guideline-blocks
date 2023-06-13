import { MetadataProps } from "../../Components/MetaData/type";
import { LibraryRequest } from "./api";
import { queryGraphql } from "../Common";

type LibraryQuery = {
    data: {
        library: Library;
    };
};

export type Library = {
    id: string;
    customMetadataProperties: MetadataProps[];
};

export const queryLibrariesByIds = async (
    libraryIds: string[]
): Promise<Library[]> => {
    try {
        return await Promise.all(
            libraryIds.map((libraryId) => getLibraryById(libraryId))
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export const getLibraryById = async (libraryId: string): Promise<Library> => {
    const uploadBody = JSON.stringify({
        query: LibraryRequest(libraryId),
    });

    const {
        data: { library },
    } = (await queryGraphql(uploadBody)) as LibraryQuery;
    return library;
};
