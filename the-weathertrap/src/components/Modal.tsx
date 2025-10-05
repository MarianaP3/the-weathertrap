import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Modal() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-accent text-white px-4 py-2 rounded">Open Modal</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¡Hola!</DialogTitle>
          <DialogDescription>
            Este es un modal independiente en React.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}