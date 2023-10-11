type Node<T> = {
    val: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    public head: Node<T>;
    public tail: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        let node: Node<T> = {
            val: item,
        };
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            const currHead = this.head;
            node.next = currHead;
            this.head = node;
        }
        this.length += 1;
    }
    insertAt(item: T, idx: number): void {
        const newNode: Node<T> = {
            val: item,
        };
        const currNode = this.getNode(idx);

        if (idx === 0) {
            this.prepend(item);
        } else {
            const prevNode = this.getNode(idx - 1);
            newNode.next = currNode;
            prevNode.next = newNode;
        }
    }
    append(item: T): void {
        let node: Node<T> = {
            val: item,
        };
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length += 1;
    }
    remove(item: T): T | undefined {
        let idx = this.indexOf(item);
        return this.removeAt(idx);
    }

    indexOf(item: T): number {
        let node: Node<T> | undefined = this.head;
        let index = 0;
        do {
            if (node && node.val === item) {
                return index;
            }
            ++index;
            node = node.next;
        } while (node);

        return -1;
    }

    private getNode(idx: number): Node<T> {
        let node = this.head;
        for (let i = 0; i < idx; ++i) {
            if (node && node.next) {
                node = node.next;
            } else {
                throw new Error(
                    `Index ${idx} out of bounds ${0}..${Math.max(
                        this.length - 1,
                        0,
                    )}`,
                );
            }
        }
        return node;
    }
    get(idx: number): T | undefined {
        return this.getNode(idx).val;
    }

    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            const currNode = this.head;
            this.head = this.head.next!;
            this.length -= 1;
            return currNode.val;
        } else if (idx > 0) {
            const currNode = this.getNode(idx);
            const prevNode = this.getNode(idx - 1);
            prevNode.next = currNode.next;
            currNode.next = undefined;
            this.length -= 1;
            return currNode.val;
        }
        return undefined;
    }
    describe() {
        let node: Node<T> = this.head;
        let response = "";
        do {
            response = `${response} -> ${node.val}`;
            node = node.next!;
        } while (node);
        return response.replace("->", "").trim();
    }
}
