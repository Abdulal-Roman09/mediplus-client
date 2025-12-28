import { Specialty } from "@/interface/spilaties";

export interface CreateSpecialtyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface SpecialtiesFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    limit: string;
    onLimitChange: (value: string) => void;
}

export interface SpecialtiesHeaderProps {
    onOpenModal: () => void;
}

export interface SpecialtiesPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface SpecialtiesTableProps {
    data: Specialty[] | undefined;
    isPending: boolean;
    filteredData: Specialty[];
    searchTerm: string;
    onDelete: (id: string) => void;
    deletingId: string | null;
}

export interface SpecialtyActionsProps {
    id: string;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}

export interface SpecialtyTableRowProps {
    item: Specialty;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}
